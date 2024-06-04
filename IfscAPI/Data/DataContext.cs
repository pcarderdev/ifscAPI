using IfscAPI.Controllers;
using IfscAPI.Models;
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

    public virtual DbSet<Athlete> Athletes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder
        .UseSqlServer(_config.GetConnectionString("DefaultConnection"),
        optionsBuilder => optionsBuilder.EnableRetryOnFailure());
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Athlete>()
        .ToTable("Athletes")
        .HasKey(a => a.Id);
    }

  }
}