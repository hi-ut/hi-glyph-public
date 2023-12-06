import { prisma } from "@/lib/db/prisma";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

export default async function Home() {
  const allRelated = await prisma.glyphData.findMany(
    {
      distinct:["related"],
      select: {
        related: true
      }
    }
  );
  const charactersNumber = allRelated.length;
  const glyphsNumber = await prisma.glyphData.count();
  const usersNumber = await prisma.user.count();

  return (
    <main className="w-full">
      <div className="hero h-96 w-full bg-base-200 sm:p-4 sm:my-4">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hi Glyph</h1>
            <p className="py-6">
              A lightweight Chinese character glyph platform.
            </p>
            <Button href={"/glyphs"} as={Link} color="primary">Get Started</Button>
          </div>
        </div>
      </div>

      <div className="h-full py-16 flex items-center justify-center">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Characters</div>
            <div className="stat-value">
              <Link href={"/characters"} className="link link-hover">{charactersNumber}</Link>
            </div>
            {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Glyphs</div>
            <div className="stat-value">
              <Link href={"/glyphs"} className="link link-hover">{glyphsNumber}</Link>
            </div>
            {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Users</div>
            <div className="stat-value">{usersNumber}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        </div>
      </div>
    </main>
  );
}
