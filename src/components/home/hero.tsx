import Image from "next/image";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-80px)] overflow-hidden px-5 pb-8 pt-5 lg:min-h-[calc(90svh-5rem)] lg:px-0">
      <Image
        src="/images/background-mobile.png"
        alt="مبنى سنتر فيينا التعليمي"
        fill
        sizes="100vw"
        priority
        className="object-cover object-[center_48%] md:object-[center_52%] lg:hidden"
      />
      <Image
        src="/images/background-desktop.png"
        alt="مبنى سنتر فيينا التعليمي"
        fill
        sizes="100vw"
        priority
        className="hidden object-cover object-center lg:block"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,rgba(212,160,23,0.12),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.18)_34%,rgba(9,9,9,0.58)_66%,#090909_96%)] lg:bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.18)_48%,rgba(9,9,9,0.78)_100%)]" />

      <div className="relative z-10 flex w-full flex-col">
        <div className="flex justify-center pt-10 md:pt-14 lg:hidden">
          <div className="flex max-w-72 flex-col items-center text-center">
            <Image
              src="/images/logo-vienna.png"
              alt="Vienna Center"
              width={290}
              height={290}
              priority
              className="h-auto w-56 drop-shadow-[0_0_38px_rgba(212,160,23,0.38)] min-[390px]:w-64 lg:w-72"
            />
            <p className="-mt-1 text-lg font-black text-gold drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] min-[390px]:text-xl">
              سنتر فيينا التعليمي
            </p>
          </div>
        </div>

        <div className="hidden lg:absolute lg:left-10 lg:top-1/2 lg:flex lg:-translate-y-1/2">
          <div className="flex max-w-sm flex-col items-center text-center">
            <Image
              src="/images/logo-vienna.png"
              alt="Vienna Center"
              width={360}
              height={360}
              priority
              className="h-auto w-80 drop-shadow-[0_0_42px_rgba(212,160,23,0.34)]"
            />
            <p className="-mt-2 text-2xl font-black text-gold drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
              سنتر فيينا التعليمي
            </p>
          </div>
        </div>

        <div className="mx-auto mt-auto w-full max-w-md pb-8 text-center drop-shadow-[0_2px_16px_rgba(0,0,0,0.9)] min-[390px]:pb-10 lg:absolute lg:right-10 lg:top-1/2 lg:mx-0 lg:mt-0 lg:max-w-xl lg:-translate-y-1/2 lg:pb-0 lg:text-right">
          <h1 className="text-3xl font-black leading-tight lg:text-5xl">
            احجز مكانك الآن
          </h1>
          <p className="mt-3 text-lg font-bold text-white lg:text-2xl">
            في سنتر فيينا للعام الدراسي
          </p>
          <p className="mt-2 text-2xl font-black text-gold lg:text-4xl">
            2026 / 2027
          </p>
          <Link href="/booking" className="mx-auto mt-8 block lg:mx-0 lg:w-80">
            <Button className="w-full">
              <CalendarCheck size={22} />
              احجز الآن
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
