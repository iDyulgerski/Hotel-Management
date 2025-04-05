using hotelManagement.Services;
using Microsoft.AspNetCore.Mvc;
using hotelManagement.models;

namespace hotelManagement.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientService _clientService;

        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }

        // GET: api/Client/getAllClients
        [HttpGet("getAllClients")]
        public async Task<ActionResult<List<Client>>> GetClients()
        {
            try
            {
                var clients = await _clientService.GetAllClientsAsync();
                return Ok(clients);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Clients/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClient(int id)
        {
            try
            {
                var client = await _clientService.GetClientByIdAsync(id);

                if (client == null)
                {
                    return NotFound("Client not found");
                }

                return Ok(client);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Clients
        [HttpPost("createClient")]
        public async Task<ActionResult> CreateClient([FromBody] Client client)
        {
            try
            {
                if (client == null)
                {
                    return BadRequest("Client data is required.");
                }

                await _clientService.CreateClientAsync(client);

                return CreatedAtAction(nameof(GetClient), new { id = client.ClientId }, client);
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/Clients/{id}
        [HttpPut("updateClient/{id}")]
        public async Task<ActionResult> UpdateClient(int id, [FromBody] Client client)
        {
            try
            {
                if (client == null)
                {
                    return BadRequest("Client data is required.");
                }

                await _clientService.UpdateClientAsync(id, client);
                return NoContent(); // 204 No Content
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Client not found");
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/Client/{id}
        [HttpDelete("deleteClient/{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            try
            {
                await _clientService.DeleteClientAsync(id);
                return NoContent(); // 204 No Content
            }
            catch (KeyNotFoundException)
            {
                return NotFound("Client not found");
            }
            catch
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
