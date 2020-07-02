using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AlinaApp.Models;
using Microsoft.AspNetCore.Authorization;

namespace AlinaApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PipesController : ControllerBase
    {
        private readonly AlinaAppContext _context;

        public PipesController(AlinaAppContext context)
        {
            _context = context;
        }

        [HttpGet("onlysecret")]
        [Authorize(Roles ="admin")]
        public IEnumerable<Pipe> GetOnlysecretPipes()
        {
            return _context.GetSecretPipes();
        }

     

        //ФУНКЦИЯ КОТОРАЯ ВОЗРАЩАЕТ ВСЕ ПАЙПЫ
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pipe>>> GetAllPipes()
        {
            return await _context.Pipes.ToListAsync();
        }

        // GET: api/Pipes/5
        
        [HttpGet("{id}")]
        
        public async Task<ActionResult<Pipe>> GetPipe(long id)
        {
            var pipe = await _context.Pipes.FindAsync(id);

            if (pipe == null)
            {
                return NotFound();
            }

            return pipe;
        }

        [HttpGet("FactoryOfPipe/{pipeid}")]
        public string GetFactoryOfPipe(long pipeid)
        {
            return _context.getFactoryOfPipe(pipeid);
        }

        // PUT: api/Pipes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> PutPipe(long id, Pipe pipe)
        {
            if (id != pipe.Id)
            {
                return BadRequest();
            }

            _context.Entry(pipe).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PipeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pipes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754. 

        [HttpPost]
        [Authorize(Roles ="admin")]
        public string PostPipe(Pipe pipe)
        {
            pipe.secret = false;
            
            return _context.PostPipe(pipe);

        }

        

        // DELETE: api/Pipes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin")]
        public async Task<ActionResult<Pipe>> DeletePipe(long id)
        {
            var pipe = await _context.Pipes.FindAsync(id);
            if (pipe == null)
            {
                return NotFound();
            }

            _context.Pipes.Remove(pipe);
            await _context.SaveChangesAsync();

            return pipe;
        }

        private bool PipeExists(long id)
        {
            return _context.Pipes.Any(e => e.Id == id);
        }
    }
}
