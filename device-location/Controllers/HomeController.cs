using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using device_location.Models;
using device_location.Utils;
using Microsoft.Extensions.Configuration;


namespace device_location.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IConfiguration _configuration;

    public HomeController(ILogger<HomeController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configuration = configuration;
    }

    public IActionResult Index()
    {
        var apiKey = _configuration["GoogleMaps:ApiKey"];
        ViewData["GoogleMappsApiKey"] = apiKey;
        return View();
    }

    [HttpGet("privacy")]
    public IActionResult Privacy()
    {
        return View();
    }

    [HttpGet("error")]
    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    [HttpPost("show-location")]
    public async Task<JsonResult> ShowLocation(GeoCoordinate coordinate)
    {
        var locationViewModel = new LocationOfDeviceViewModel
        {
            DisplayName = "Client coordinates",
            Latitude = coordinate.Latitude,
            Longitude = coordinate.Longitude
        };

        var html = this.RenderViewAsync("_LocationOfDevicePartial", locationViewModel, true);

        return Json(html);
    }
}

