
import { useCurrencyStore } from "@/store/currencyStore";
import { useEffect, useRef, useState } from "react";

type CurrencyDisplayProps = {
    valueInRUB?: number;
};


export function CurrencyDisplay({ valueInRUB }: CurrencyDisplayProps) {
    const {selectedCurrency} = useCurrencyStore();
    const [animate, setAnimate] = useState(false);
    const prevCurrencyRef = useRef(selectedCurrency);

    useEffect(() => {
        if (selectedCurrency && prevCurrencyRef.current?.currency_abbr !== selectedCurrency?.currency_abbr) {
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 300);
            prevCurrencyRef.current = selectedCurrency;
            return () => clearTimeout(timer);
        }
        prevCurrencyRef.current = selectedCurrency;
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