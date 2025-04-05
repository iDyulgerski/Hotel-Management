using hotelManagement.DTOs;
using hotelManagement.Services;
using hotelManagement.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hotelManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _reservationService;

        public ReservationController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet("getAllReservations")]
        public async Task<IActionResult> GetAllReservations()
        {
            var reservations = await _reservationService.GetAllReservationsAsync();

            return Ok(reservations);
        }

        // POST: api/Reservation/createReservation
        [HttpPost("createReservation")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationCreationDto reservationDto)
        {
            // Check if room is available during the requested dates
            if (!_reservationService.IsRoomAvailable(reservationDto.RoomId, reservationDto.CheckIn, reservationDto.CheckOut))
            {
                return BadRequest("The room is already booked during these dates.");
            }

            // Create the reservation
            var reservation = await _reservationService.CreateReservation(reservationDto);

            return Ok(new { message = "Reservation successfully created.", reservationId = reservation.ReservationId });
        }

        [HttpDelete("deleteReservation/{reservationId}")]
        public async Task<IActionResult> DeleteReservation(int reservationId)
        {
            bool isDeleted = await _reservationService.DeleteReservationAsync(reservationId);

            if (!isDeleted)
            {
                return NotFound();  // Return 404 if reservation wasn't found
            }

            return NoContent();  // Return 204 if deletion was successful
        }
    }
}
