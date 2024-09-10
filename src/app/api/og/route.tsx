import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const font1 = await fetch(
      new URL("../../assets/fonts/satoshi-bold-webfont.woff", import.meta.url)
    );

    if (!font1.ok) {
      throw new Error("Failed to fetch the font file");
    }

    const fontData1 = await font1.arrayBuffer();

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-white">
          <div tw="bg-gray-50 flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
                <span>flipassist</span>
                <span tw="text-indigo-600">Tools for Resellers. </span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <div tw="flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white">
                    Get started
                  </a>
                </div>
                <div tw="ml-3 flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-white px-5 py-3 text-base font-medium text-indigo-600">
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: "twemoji",
        fonts: [
          {
            name: "Inter",
            data: fontData1,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("An unknown error occurred");
    }
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
