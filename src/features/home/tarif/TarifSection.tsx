import { Button } from "@/components/ui/button";
import { TarifCardList } from "./TarifCardList";
import TarifHeader from "./TarifHeader";
import { MessageCircle } from "lucide-react";

export default function TarifSection() {
    return (
        <article className="py-10 bg-surface" id="tarifs">
            <TarifHeader />
            <section className="max-w-6xl mx-auto px-6 lg:px-8">
                <TarifCardList />
            </section>
            <div className="mt-15 flex flex-col gap-y-2 items-center justify-center">
                <div className="px-4 py-2">
                    <p className="text-h6 text-secondary text-center">
                        Besoin d&apos;aide pour choisir ? Nos experts sont là pour vous conseiller
                    </p>
                </div>
                <Button className="bg-transparent hover:bg-outline text-primary border border-outline rounded-full">
                   <MessageCircle className="size-4 text-primary" />
                    Parler à un expert
                </Button>
            </div>
        </article>
    )
}