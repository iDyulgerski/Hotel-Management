using hotelManagement.models;
using Microsoft.EntityFrameworkCore;

namespace hotelManagement.Services
{
    public class RoomService
    {
        private readonly ApplicationDbContext _context;

        public RoomService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Room>> GetAllRoomsAsync()
        {
            return await _context.Rooms.ToListAsync();
        }

        // Get a room by its ID
        public async Task<Room> GetRoomByIdAsync(int roomId)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.RoomId == roomId);
        }

        public async Task<bool> RoomNumberExistsAsync(string roomNumber, int? roomId = null)
        {
            return await _context.Rooms
                .Where(r => r.RoomNumber == roomNumber && (roomId == null || r.RoomId != roomId))
                .AnyAsync();
        }
        // Create a new room
        public async Task CreateRoomAsync(Room room)
        {
            // Check if the room number already exists
            if (await RoomNumberExistsAsync(room.RoomNumber))
            {
                throw new InvalidOperationException("Room number is already taken.");
            }
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
        }

        // Update an existing room
        public async Task UpdateRoomAsync(int id, Room room)
        {
            // Check if the room number is already taken (excluding the current room being updated)
            if (await RoomNumberExistsAsync(room.RoomNumber, id))
            {
                throw new InvalidOperationException("Room number is already taken.");
            }

            var existingRoom = await _context.Rooms.FindAsync(id);
            if (existingRoom == null)
            {
                throw new KeyNotFoundException("Room not found.");
            }

            // Update the room details
            existingRoom.RoomNumber = room.RoomNumber;
            existingRoom.RoomType = room.RoomType;
            existingRoom.Capacity = room.Capacity;
            existingRoom.PricePerAdult = room.PricePerAdult;
            existingRoom.PricePerChild = room.PricePerChild;
            existingRoom.IsAvailable = room.IsAvailable;

            await _context.SaveChangesAsync();
        }

        // Delete a room by its ID
        public async Task DeleteRoomAsync(int roomId)
        {
            var room = await GetRoomByIdAsync(roomId);
            if (room != null)
            {
                _context.Rooms.Remove(room);
                await _context.SaveChangesAsync();
            }
        }
    }
}
