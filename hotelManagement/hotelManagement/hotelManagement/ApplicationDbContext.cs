using hotelManagement.models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace hotelManagement
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // DbSets for each table in the database
        public DbSet<User> Users { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<ReservationClient> ReservationClients { get; set; }

        // Configuring the relationships
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Reservation-Client many-to-many relationship
            modelBuilder.Entity<ReservationClient>()
                .HasKey(rc => new { rc.ReservationId, rc.ClientId });

            modelBuilder.Entity<ReservationClient>()
                .HasOne(rc => rc.Reservation)
                .WithMany(r => r.ReservationClients)
                .HasForeignKey(rc => rc.ReservationId);

            modelBuilder.Entity<ReservationClient>()
                .HasOne(rc => rc.Client)
                .WithMany(c => c.ReservationClients)
                .HasForeignKey(rc => rc.ClientId);

            // Add other necessary configurations for other tables (if needed)
        }
    }

}
