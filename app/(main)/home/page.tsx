import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth";
import Header from "@/components/Header";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div>
      <Header label="Home" />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam dolorem
      ipsa possimus reiciendis vel voluptatem fugit sequi incidunt consequatur
      tempore deserunt obcaecati, reprehenderit aut ducimus totam eos cumque
      expedita perferendis commodi quae error? Repellat exercitationem nisi
      possimus enim quod fugit aut perferendis suscipit soluta neque at ullam
      blanditiis culpa a quas aspernatur impedit, deleniti quidem eum error ab
      aliquid autem. Vero, eligendi mollitia. Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Dolore temporibus reiciendis dicta quidem?
      Et beatae velit eius sed necessitatibus laborum ipsum ipsa dolore
      explicabo vitae inventore, cupiditate minima mollitia porro sapiente
      molestiae repudiandae obcaecati tenetur. Debitis cum, nam corporis error
      sapiente quisquam voluptas illum quibusdam at, placeat odio. Lorem ipsum
      dolor sit amet consectetur adipisicing elit. Cum asperiores ipsum
      perspiciatis sint sunt assumenda quasi magni eligendi, earum reiciendis!
      Aliquam repellat hic assumenda optio quaerat, fugiat doloribus consequatur
      nam labore. Ratione, eligendi nostrum! Aspernatur tenetur minus ut! Esse
      autem dolorum quas accusamus? Dolorem quam modi incidunt delectus,
      sapiente ut tempore officia iure quo eligendi minus amet cupiditate
      tempora neque laboriosam fuga iste minima vitae totam tenetur ipsa? Fugiat
      dolorem pariatur labore quo. Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Eveniet fugit fugiat molestiae repellat rem quibusdam
      reiciendis iste quia harum necessitatibus est eaque dolorem, repellendus
      dolor sequi aperiam corporis? Odio, totam harum ex voluptatibus iure
      dolorem aperiam in debitis adipisci tempore eaque, aliquid nihil non
      facilis fugiat labore veritatis nemo nam magnam repellendus. Iusto nostrum
      obcaecati fuga est amet dicta fugit accusantium assumenda facilis. Odit,
      asperiores nam explicabo, ratione aut magni eius quae magnam vero amet,
      consectetur maiores. Fugiat veniam voluptates quisquam non, explicabo eum
      optio sint expedita voluptas aperiam reprehenderit nemo praesentium
      corporis iure dolorem maiores recusandae esse a modi repudiandae!
      Perferendis sed illum accusamus laudantium amet praesentium. Sapiente
      corporis natus pariatur quaerat excepturi consectetur numquam laborum esse
      eos, vero magni vitae, alias dolorem omnis? Quas magnam iste, voluptates
      numquam aperiam veritatis fugiat ullam voluptate? Voluptas ducimus maxime
      possimus error dolorum tenetur veritatis sequi perferendis quasi dolor?
      Corporis, facere id? Vel, impedit cumque magni repudiandae ipsa iusto hic
      eius quasi sunt possimus facere aliquid laboriosam maxime libero nobis
      minus pariatur?
    </div>
  );
};

export default Page;
