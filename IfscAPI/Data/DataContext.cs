using Microsoft.EntityFrameworkCore;

namespace IfscAPI.Data
{
  public class DataContext : DbContext
  {
    private readonly IConfiguration _config;
    public DataContext(IConfiguration config)
    {
      _config = config;
    }

  }
}