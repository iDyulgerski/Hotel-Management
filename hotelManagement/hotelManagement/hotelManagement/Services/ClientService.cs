using hotelManagement.DTOs;
using hotelManagement.models;
using Microsoft.EntityFrameworkCore;
namespace hotelManagement.Services;  // Update with your actual namespace

public class ClientService
{
    private readonly ApplicationDbContext _context;

    public ClientService(ApplicationDbContext context)
    {
        _context = context;
    }

    // Get all clients
    public async Task<List<Client>> GetAllClientsAsync()
    {
        return await _context.Clients.ToListAsync();
    }

    // Get a client by Id
    public async Task<Client> GetClientByIdAsync(int clientId)
    {
        return await _context.Clients.FirstOrDefaultAsync(c => c.ClientId == clientId);
    }

    // Add a new client
    public async Task CreateClientAsync(Client client)
    {
        _context.Clients.Add(client);
        await _context.SaveChangesAsync();
    }

    // Update an existing client
    public async Task UpdateClientAsync(int clientId, Client client)
    {
        var existingClient = await _context.Clients.FirstOrDefaultAsync(c => c.ClientId == clientId);

        if (existingClient != null)
        {
            existingClient.FirstName = client.FirstName;
            existingClient.LastName = client.LastName;
            existingClient.Phone = client.Phone;
            existingClient.Email = client.Email;
            existingClient.IsAdult = client.IsAdult;

            await _context.SaveChangesAsync();
        }
        else
        {
            throw new KeyNotFoundException("Client not found.");
        }
    }

    // Delete a client by Id
    public async Task DeleteClientAsync(int clientId)
    {
        var client = await _context.Clients.FirstOrDefaultAsync(c => c.ClientId == clientId);

        if (client != null)
        {
            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
        }
        else
        {
            throw new KeyNotFoundException("Client not found.");
        }
    }
}
