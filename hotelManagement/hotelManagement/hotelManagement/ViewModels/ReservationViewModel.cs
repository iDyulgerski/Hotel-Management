namespace hotelManagement.ViewModels
{
    public class ReservationViewModel
    {
        public int ReservationId { get; set; }
        public string ClientName { get; set; }
        public string RoomNumber { get; set; }
        public DateTime CheckIn { get; set; }
        public DateTime CheckOut { get; set; }  
        public bool IncludesBreakfast { get; set; }
        public bool AllInclusive { get; set; }
        public int NumberOfAdults { get; set; }
        public int NumberOfChildren { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
