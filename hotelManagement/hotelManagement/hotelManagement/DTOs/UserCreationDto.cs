namespace hotelManagement.DTOs
{
    public class UserCreationDto
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Egn { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime HireDate { get; set; }
        public string Role { get; set; }
        public bool IsActive { get; set; } = true; // Default value is true
        public DateTime? ReleaseDate { get; set; } = null; // Default value is null
    }
}
