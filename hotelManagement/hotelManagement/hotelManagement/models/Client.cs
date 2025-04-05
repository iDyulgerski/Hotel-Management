using System.ComponentModel.DataAnnotations;

namespace hotelManagement.models
{
    public class Client
    {
        public int ClientId { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        [Phone]
        public string Phone { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        public bool IsAdult { get; set; }

        public ICollection<ReservationClient> ReservationClients { get; set; } = new List<ReservationClient>();
    }
}
