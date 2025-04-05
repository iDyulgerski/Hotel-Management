using System.ComponentModel.DataAnnotations;

namespace hotelManagement.models
{
    public class Room
    {
        public int RoomId { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Capacity must be greater than 0.")]
        public int Capacity { get; set; }

        [Required]
        [StringLength(50)]
        public string RoomType { get; set; }

        public bool IsAvailable { get; set; } = true;

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price per adult must be a positive value.")]
        public decimal PricePerAdult { get; set; }

        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price per child must be a positive value.")]
        public decimal PricePerChild { get; set; }

        [Required]
        [StringLength(10)]
        public string RoomNumber { get; set; }


    }
}
