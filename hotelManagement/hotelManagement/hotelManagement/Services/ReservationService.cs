using hotelManagement.DTOs;
using hotelManagement.models;
using Microsoft.EntityFrameworkCore;
using System;

namespace hotelManagement.Services
{
    public class ReservationService
    {
        private readonly ApplicationDbContext _context;

        public ReservationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reservation>> GetAllReservationsAsync()
        {
            return await _context.Reservations
                .Include(r => r.CreatedByClient)
                .Include(r => r.Room)
                .OrderBy(x => x.CheckIn)
                .ThenBy(x => x.ReservationId)
                .ToListAsync();
        }

        // Method to check if the room is already booked for the given dates
        public bool IsRoomAvailable(int roomId, DateTime checkIn, DateTime checkOut)
        {
            var existingReservation = _context.Reservations
                .Where(r => r.RoomId == roomId &&
                            ((checkIn >= r.CheckIn && checkIn < r.CheckOut) ||
                             (checkOut > r.CheckIn && checkOut <= r.CheckOut)))
                .FirstOrDefault();
            return existingReservation == null;
        }

        // Method to create a new reservation
        public async Task<Reservation> CreateReservation(ReservationCreationDto reservationDto)
        {
            var reservation = new Reservation
            {
                RoomId = reservationDto.RoomId,
                CreatedByClientId = reservationDto.CreatedByClientId,
                CheckIn = reservationDto.CheckIn,
                CheckOut = reservationDto.CheckOut,
                IncludesBreakfast = reservationDto.IncludesBreakfast,
                AllInclusive = reservationDto.AllInclusive,
                NumberOfAdults = reservationDto.NumberOfAdults,
                NumberOfChildren = reservationDto.NumberOfChildren,
                TotalPrice = reservationDto.TotalPrice
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
            return reservation;
        }

        public async Task<bool> DeleteReservationAsync(int reservationId)
        {
            var reservation = await _context.Reservations.FindAsync(reservationId);
            if (reservation == null)
            {
                return false;  // Reservation not found
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();
            return true;  // Reservation deleted successfully
        }

    }
}
