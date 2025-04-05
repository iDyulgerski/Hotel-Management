using System.ComponentModel.DataAnnotations;

namespace hotelManagement.models
{
    public class ReservationClient
    {
        [Required]
        public int ReservationId { get; set; }

        [Required]
        public int ClientId { get; set; }

        // Navigation properties
        public Reservation Reservation { get; set; }
        public Client Client { get; set; }
    }
}
