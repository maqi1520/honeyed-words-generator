import { useEffect } from "react";
import { Helmet } from "react-helmet";
import anime from "animejs";
import { generate } from "../lib/generator";

interface Props {
  word: { content: string };
}

const Home = ({ word }: Props) => {
  useEffect(() => {
    const textWrapper = document.querySelector(".wrap")!;
    textWrapper.innerHTML = (textWrapper.textContent as string).replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    const tl = anime.timeline({
      targets: ".heart",
      translateX: function () {
        const w = window.innerWidth;
        return anime.random(-w / 2, w / 2);
      },
      translateY: function () {
        const h = window.innerHeight;
        return anime.random(-h / 2, h / 2);
      },
      scale: function () {
        return anime.random(1, 5);
      },
      duration: 2000,
      delay: function (el, i) {
        return i * 5;
      },
      //direction: 'alternate',
      //loop: true
    });

    const currentText = document.querySelectorAll(".wrap .letter");

    tl.add({
      targets: currentText,
      translateY: ["-.75em", 0],
      /*clipPath: ['polygon(0 0, 100% 0, 100% 100%, 0% 100%)', 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)'],*/
      opacity: [0, 1],
      easing: "easeInQuint",
      duration: 400,
      delay: (el, i) => 10 * (i + 1),
    });
  });
  return (
    <div>
      <Helmet
        title="土味情话 在线生成 - honeyed words generator"
        meta={[
          {
            property: "og:title",
            content: "土味情话 在线生成 情人节 七夕节 表白利器 甜言蜜语",
          },
        ]}
      />

      <div className="h-screen bg-pink-200">
        {new Array(100).fill("").map((i, index) => (
          <div key={index} className="heart">
            <div className="heart-inner"></div>
          </div>
        ))}
      </div>
      <div className="fixed  inset-0 flex items-center justify-center">
        <h1 className="wrap rounded-3xl text-5xl text-white max-w-5xl bg-black bg-opacity-30 p-10 leading-loose mx-auto">
          {word.content}
        </h1>
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  return { props: { word: generate() } };
}
