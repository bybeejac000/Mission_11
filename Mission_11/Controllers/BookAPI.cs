using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission_11.Models;

namespace Mission_11.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookAPI : ControllerBase
    {

        public BookstoreContext _context;

        public BookAPI(BookstoreContext temp)
        {
            _context = temp;
        }

        [HttpGet (Name ="GetBooks")]
        public IActionResult GetBooks(int pageHowMany, int pageSize, int sort)
        {

            var totalNum = _context.Books.Count();


            List<Book> results = _context.Books
                .Skip((pageSize - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            if (sort==1)
            {
                
                results = results.OrderBy((p) => p.Title).ToList();
            }
            




            return Ok(new
            {
                Res = results,
                TotalRes = totalNum
            });
                
               
        }



    }
}
