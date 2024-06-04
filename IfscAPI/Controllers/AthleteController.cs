using IfscAPI.Data;
using IfscAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace IfscAPI.Controllers;

[ApiController]
[Route("[controller]")]
public class AthleteController : ControllerBase
{
  DataContext _context;

  public AthleteController(IConfiguration config)
  {
    _context = new DataContext(config);
  }

  [HttpGet("TestConnection")]
  public DateTime TestConnection()
  {
    return _context.Database.CanConnect() ? DateTime.Now : DateTime.MinValue;
  }

  [HttpGet("GetAthletes")]
  public IEnumerable<Athlete> GetAthletes()
  {
    IEnumerable<Athlete> athletes = _context.Athletes.ToList<Athlete>();
    return athletes;
  }

  [HttpGet("GetAthlete/{id}")]
  public Athlete GetAthlete(int id)
  {
    Athlete? athlete = _context.Athletes
      .Where(a => a.Id == id)
      .FirstOrDefault();

    if (athlete != null)
    {
      return athlete;
    }

    throw new Exception("Athlete not found");
  }

  [HttpPost("AddAthlete")]
  public IActionResult AddAthlete(AthleteDto athlete)
  {
    Athlete athleteDb = new Athlete();
    athleteDb.FullName = athlete.FullName;
    athleteDb.IfscUrl = athlete.IfscUrl;
    athleteDb.Country = athlete.Country;

    _context.Add(athleteDb);

    if (_context.SaveChanges() > 0)
    {
      return Ok();
    }

    throw new Exception("Failed to add athlete");
  }

  [HttpPut("EditAthlete")]
  public IActionResult EditAthlete(Athlete athlete)
  {
    Athlete? athleteDb = _context.Athletes
      .Where(a => a.Id == athlete.Id)
      .FirstOrDefault();

    if (athleteDb != null)
    {
      athleteDb.FullName = athlete.FullName;
      athleteDb.Country = athlete.Country;
      athleteDb.IfscUrl = athlete.IfscUrl;

      if (_context.SaveChanges() > 0)
      {
        return Ok();
      }

      throw new Exception("Failed to update athlete information");
    }

    throw new Exception("Athlete not found");
  }

  [HttpDelete("DeleteAthlete/{id}")]
  public IActionResult DeleteAthlete(int id)
  {
    Athlete? athleteDb = _context.Athletes
      .Where(a => a.Id == id)
      .FirstOrDefault();

    if (athleteDb != null)
    {
      _context.Athletes.Remove(athleteDb);

      if (_context.SaveChanges() > 0)
      {
        return Ok();
      }

      throw new Exception("Failed to delete athlete");
    }
    throw new Exception("Athlete not found");
  }


}