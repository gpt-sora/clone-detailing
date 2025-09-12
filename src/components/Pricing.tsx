import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Plan = { name: string; price: string; features: string[] };

const vehicleTabs = ["cars", "suvs", "trucks", "bikes"] as const;

const plans: Record<(typeof vehicleTabs)[number], Plan[]> = {
  cars: [
    { name: "Basic", price: "$ 250.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Standard", price: "$ 350.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Premium", price: "$ 450.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
  ],
  suvs: [
    { name: "Basic", price: "$ 280.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Standard", price: "$ 380.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Premium", price: "$ 480.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
  ],
  trucks: [
    { name: "Basic", price: "$ 300.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Standard", price: "$ 420.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Premium", price: "$ 520.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
  ],
  bikes: [
    { name: "Basic", price: "$ 150.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Standard", price: "$ 220.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
    { name: "Premium", price: "$ 300.00 USD", features: ["Pellentesque iaculis lorem", "Nulla dictum lectus sed", "Nullam non massa magna"] },
  ],
};

export const Pricing: React.FC = () => {
  return (
    <Section id="pricing" ariaLabel="Piani tariffari">
      <Container>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">prezzi</h2>
        <Tabs defaultValue="cars" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            {vehicleTabs.map((v) => (
              <TabsTrigger key={v} value={v} className="capitalize">
                {v}
              </TabsTrigger>
            ))}
          </TabsList>
          {vehicleTabs.map((v) => (
            <TabsContent key={v} value={v} className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plans[v].map((p) => (
                  <Card key={p.name} className="flex flex-col border-neutral-200 dark:border-white/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{p.name}</CardTitle>
                      <div className="mt-1 text-2xl font-bold">{p.price}</div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <ul className="mb-6 mt-2 space-y-2 text-sm text-muted-foreground">
                        {p.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                      <Button variant="secondary" disabled aria-disabled>
                        Acquista
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
};


