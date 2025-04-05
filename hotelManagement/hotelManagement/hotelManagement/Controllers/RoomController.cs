using hotelManagement.models;
using hotelManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace hotelManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly RoomService _roomService;

        public RoomController(RoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("getAllRooms")]
        public async Task<IActionResult> GetAllRooms()
        {
            var rooms = await _roomService.GetAllRoomsAsync();
            return Ok(new { Values = rooms });
        }

        // GET: api/Room/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomById(int id)
        {
            var room = await _roomService.GetRoomByIdAsync(id);
            if (room == null)
            {
                return NotFound("Room not found");
            }
            return Ok(room);
        }

        // POST: api/Room/create-room
        [HttpPost("create-room")]
        public async Task<IActionResult> CreateRoom([FromBody] Room room)
        {
            if (room == null)
            {
                return BadRequest("Room data is required.");
            }

            try
            {
                await _roomService.CreateRoomAsync(room);
                return CreatedAtAction(nameof(GetRoomById), new { id = room.RoomId }, room);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message }); // 409 Conflict if room number is taken
            }
        }

        // PUT: api/Room/update-room/{id}
        [HttpPut("update-room/{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] Room room)
        {
            if (room == null)
            {
                return BadRequest("Room data is required.");
            }

            try
            {
                // Check if the room number is already taken for any room other than the one being updated
                await _roomService.UpdateRoomAsync(id, room);
                return NoContent(); // Successful update with no content returned
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message }); // 409 Conflict if room number is taken
            }
        }

        // DELETE: api/Room/delete-room/{id}
        [HttpDelete("delete-room/{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            await _roomService.DeleteRoomAsync(id);
            return NoContent();
        }
    }
}
