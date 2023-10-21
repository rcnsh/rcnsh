import { FaGithub } from "react-icons/fa";
import Link from "next/link";

function Footer() {
  return (
    <>
      <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
      <footer className={"flex justify-evenly"}>
        <span className={"font-bold text-[#cdc8c2]"}>Jacob Wiltshire</span>
        <section>
          <Link href={"https://github.com/RCNOverwatcher"}>
            <FaGithub size={32} color={"white"} />
          </Link>
        </section>
      </footer>
      <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25" />
    </>
  );
}

export default Footer;
