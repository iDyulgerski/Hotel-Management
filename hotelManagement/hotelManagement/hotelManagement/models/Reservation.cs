using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hotelManagement.models
{
    public class Reservation
    {
        public int ReservationId { get; set; }

        [Required]
        public int RoomId { get; set; }

        [Required]
        public int CreatedByClientId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime CheckIn { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [CheckOutDateGreaterThanCheckIn(ErrorMessage = "Check-out date must be later than check-in date.")]
        public DateTime CheckOut { get; set; }

        public bool IncludesBreakfast { get; set; } = false;

        public bool AllInclusive { get; set; } = false;

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Number of adults must be greater than or equal to 1.")]
        public int NumberOfAdults { get; set; }

        [Required]
        [Range(0, int.MaxValue, ErrorMessage = "Number of children must be greater than or equal to 0.")]
        public int NumberOfChildren { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Total price must be a positive value.")]
        public decimal TotalPrice { get; set; }

        // Navigation properties
        public Room Room { get; set; }
        public Client CreatedByClient { get; set; }

        public ICollection<ReservationClient> ReservationClients { get; set; } = new List<ReservationClient>();
    }

    // Custom Validation for CheckOut date
    public class CheckOutDateGreaterThanCheckIn : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var checkOutDate = (DateTime)value;
            var checkInDate = (DateTime)value; // assume check-in date is passed in
            return checkOutDate > checkInDate;
        }
    }
}
