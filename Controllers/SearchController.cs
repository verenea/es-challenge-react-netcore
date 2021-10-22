using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace es_challenge.Controllers {

    [ApiController]
    [Route("[controller]")]
    public class SearchController : ControllerBase {

        private readonly ILogger<SearchController> _logger;

        public SearchController(ILogger<SearchController> logger) {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Get([FromQuery] string ver) {
            try {
                // validate version param
                if (ver == null) {
                    throw new ArgumentException("Version was not supplied");
                } else if (!ver.IsValidVersionNumber()) {
                    throw new ArgumentException("Invalid version format");
                }

                // query dataset, filter, then order
                // we could have the option to order by different fields as desired via query params,
                // but for the sake of time constraints of this exercise we'll ust go by the name, then ver
                // there are more streamlined libraries and methods to reduce comp complexity here as well
                IEnumerable<SoftwareProfile> items = SoftwareManager.GetAllSoftware()
                    .Where(x => x.Version.IsGreaterThan(ver))
                    .OrderBy(x => x.Name)
                    .ThenBy(x => SoftwareManager.getVersionParts(x.Version)[0])
                ;

                return Ok(items);

            } catch (Exception ex) {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
