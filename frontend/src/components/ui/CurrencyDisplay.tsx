
import { useCurrencyStore } from "@/store/currencyStore";
import { useEffect, useState } from "react";

type CurrencyDisplayProps = {
    valueInRUB?: number;
};

export function CurrencyDisplay({ valueInRUB }: CurrencyDisplayProps) {
    const {selectedCurrency} = useCurrencyStore();
    const [animate, setAnimate] = useState(false);
    
    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 300);
        return () => clearTimeout(timer);
    }, [selectedCurrency]);

    if(!valueInRUB || !selectedCurrency?.currency_rate) {
        return <div>N/A</div>
    }

    return (
        <div
            style={{
                transition: "color 0.5s ease",
                color: animate ? "rgb(var(--color-background-secondary))" : "inherit"
            }}
        >
            {selectedCurrency?.currency_abbr}
            {(valueInRUB*selectedCurrency.currency_rate).toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            })}
        </div>
    );
}    