using hotelManagement.DTOs;
using hotelManagement.models;
using Microsoft.EntityFrameworkCore;

namespace hotelManagement.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> LogInAsync(UserLoginDto userLoginDto)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == userLoginDto.UsernameOrEmail || u.Email == userLoginDto.UsernameOrEmail);

            if (user == null || user.Password != userLoginDto.Password)  // Compare passwords in plain text
            {
                throw new Exception("Invalid username/email or password.");
            }

            return user;  // Return user for further operations (e.g., token generation)
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task ResignUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            user.IsActive = false;
            user.ReleaseDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
        }

        public async Task HireAgainUserAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException();
            }

            user.IsActive = true;
            user.ReleaseDate = null;
            await _context.SaveChangesAsync();
        }

        public async Task<User> CreateUserAsync(UserCreationDto userDto)
        {
            var user = new User
            {
                Username = userDto.Username,
                FirstName = userDto.FirstName,
                MiddleName = userDto.MiddleName,
                LastName = userDto.LastName,
                Egn = userDto.Egn,
                Phone = userDto.Phone,
                Email = userDto.Email,
                Password = userDto.Password, // Ideally hashed before saving
                HireDate = userDto.HireDate,
                Role = userDto.Role,
                IsActive = userDto.IsActive,
                ReleaseDate = userDto.ReleaseDate
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            return user; // If not found, null will be returned
        }

        public async Task<User> UpdateUserAsync(int userId, User user)
        {
            var existingUser = await _context.Users.FindAsync(userId);

            if (existingUser == null)
            {
                return null; // User not found
            }

            // Update fields in the existing user object
            existingUser.Username = user.Username;
            existingUser.FirstName = user.FirstName;
            existingUser.MiddleName = user.MiddleName;
            existingUser.LastName = user.LastName;
            existingUser.Egn = user.Egn;
            existingUser.Phone = user.Phone;
            existingUser.Email = user.Email;
            existingUser.Password = user.Password; // Assume password is handled securely
            existingUser.HireDate = user.HireDate;
            existingUser.Role = user.Role;
            existingUser.IsActive = user.IsActive;

            // Save changes to the database
            await _context.SaveChangesAsync();

            return existingUser;
        }
    }
}
