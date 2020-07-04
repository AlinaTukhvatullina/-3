using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace AlinaApp.Models
{
    public class AlinaAppContext : DbContext
    {
        public AlinaAppContext(DbContextOptions<AlinaAppContext> options)
            : base(options)
        {
        }

        public DbSet<Factorys> Factoryses { get; set; }
        public DbSet<Pipe> Pipes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //настраиваем связь один ко многим
            modelBuilder.Entity<Pipe>()
            .HasOne(p => p.factorys)
            .WithMany(b => b.pipes)
            .HasForeignKey(p => p.FactoryId);
        }

        public string getFactoryOfPipe(long pipeId)
        {
            Factoryses.Include(c => c.pipes).ThenInclude(p => p.factorys).ToList();
            foreach(var p in Pipes)
            {
                if (p.Id == pipeId)
                {
                    return p.factorys.name;
                }
            }
            return "";
        }

        public IEnumerable<string> getPipesOfOneFactory(long factid)
        {
            Factoryses.Include(c => c.pipes).ToList();
            List<string> pipe_names = new List<string>();

            foreach (var f in Factoryses)
            {
                if (f.Id == factid)
                {
                    foreach(var p in f.pipes)
                    {
                        pipe_names.Add(p.name);
                    }
                }
            }
            return pipe_names;

        }

        public IEnumerable<Pipe> getPipeByName(string name)
        {
            return
                from p in Pipes
                where p.name == name
                select p;
        }

        public IEnumerable<Factorys> getFactorysByName(string name)
        {
            try
            {
                return
                    from f in Factoryses
                    where f.name == name
                    select f;
            }
            catch
            {
                IEnumerable<Factorys> b=null;
                return b;
            }
        }


        public string PostPipe(Pipe p)
        {
            if (p.Id != 0)
            {
                return "You cannot assign Id yourself";
            }

            foreach(var f in Factoryses)
            {
                if (f.Id == p.FactoryId)
                {
                    f.pipes.Add(p);
                    SaveChanges();
                    return "Okey";
                }

            }
            return "No factory";
        }

        public IEnumerable<Factorys> GetFactorys()
        {
            
            Factoryses.Include(c => c.pipes).ThenInclude(p => p.factorys).ToList();
            
            return Factoryses;
        }

        public IEnumerable<Pipe> GetPipes()
        {
            Factoryses.Include(c => c.pipes).ThenInclude(p => p.factorys).ToList();
            return
                from p in Pipes
                where p.secret == false
                select p;
        }

        public IEnumerable<Pipe> GetSecretPipes()
        {
            Factoryses.Include(c => c.pipes).ThenInclude(p => p.factorys).ToList();
            return
                from p in Pipes
                where p.secret == true
                select p;
        }
    }
}
