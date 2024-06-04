namespace IfscAPI.Models
{
  public class Athlete
  {
    public int Id { get; set; }
    public string FullName { get; set; } = "";
    public string Country { get; set; } = "";
    public string IfscUrl { get; set; } = "";
  }
}