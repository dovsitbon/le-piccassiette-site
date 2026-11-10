"use client";

import type { ReactNode } from "react";
import type { ItemId } from "@/lib/carte";

export const ORDER_EVENT = "piccassiette:order";
export type OrderIntent = { item: ItemId };

/**
 * Lien vers la commande du midi. Sur la page de commande, ajoute le plat et descend jusqu'au formulaire ;
 * ailleurs, mémorise le plat (le formulaire le reprendra au chargement) et laisse le lien faire.
 */
export function goToOrder(intent?: OrderIntent) {
  if (intent) window.dispatchEvent(new CustomEvent<OrderIntent>(ORDER_EVENT, { detail: intent }));
  const el = document.getElementById("commander");
  if (!el) {
    try {
      if (intent) sessionStorage.setItem(ORDER_EVENT, JSON.stringify(intent));
    } catch {}
    return false;
  }
  el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  history.replaceState(null, "", "#commander");
  return true;
}

export function OrderLink({ href, intent, className = "", children, label, onNavigate }: { href: string; intent?: OrderIntent; className?: string; children: ReactNode; label?: string; onNavigate?: () => void }) {
  return (
    <a
      href={`${href}#commander`}
      aria-label={label}
      className={className}
      onClick={(e) => {
        onNavigate?.();
        if (goToOrder(intent)) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
