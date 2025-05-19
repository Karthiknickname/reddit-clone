import Head from "next/head";
import Header from "../../Components/Header";
import PostBox from "../../Components/postbox";

export default function Home() {
  return (
    <><Header /><div className="my-7 mx-auto max-w-5xl">
      <Head>
        <title>Reddit 2.0</title>
      </Head>

      {/* Post Box */}
      <PostBox />
      <div className="flex">{/* Feed */}</div>
    </div></>
  );
}