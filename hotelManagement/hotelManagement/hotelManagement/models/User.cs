using System.ComponentModel.DataAnnotations;

namespace hotelManagement.models
{
    public class User
    {
        public int UserId { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; }

        [Required]
        [StringLength(255, MinimumLength = 6)]
        public string Password { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string MiddleName { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required]
        [StringLength(10)]
        public string Egn { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 10)]
        [Phone]
        public string Phone { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public string Email { get; set; }

        [Required]
        public DateTime HireDate { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime? ReleaseDate { get; set; }

        [Required]
        [StringLength(20)]
        public string Role { get; set; }
    }
}
