namespace hotelManagement.DTOs
{
    public class ReservationCreationDto
    {
        public int RoomId { get; set; }
        public int CreatedByClientId { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }
        public bool IncludesBreakfast { get; set; }
        public bool AllInclusive { get; set; }
        public int NumberOfAdults { get; set; }
        public int NumberOfChildren { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
