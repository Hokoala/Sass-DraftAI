"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const formats = [
  { id: "blog", label: "Article de blog" },
  { id: "newsletter", label: "Newsletter" },
  { id: "linkedin", label: "Thread LinkedIn" },
  { id: "libre", label: "Libre" },
];

const formatLabels: Record<string, string> = {
  blog: "Blog",
  newsletter: "Newsletter",
  linkedin: "LinkedIn",
  libre: "Libre",
};

const planLabels: Record<string, string> = {
  starter: "Starter",
  pro: "Pro",
  studio: "Studio",
};

type Generation = {
  id: string;
  created_at: string;
  prompt: string;
  format: string;
  result: string;
};

export default function GeneratePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [format, setFormat] = useState("blog");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Generation[]>([]);
  const [selectedItem, setSelectedItem] = useState<Generation | null>(null);
  const [plan, setPlan] = useState("starter");
  const [monthlyCount, setMonthlyCount] = useState(0);
  const [monthlyLimit, setMonthlyLimit] = useState<number | null>(5);
  const [allowedFormats, setAllowedFormats] = useState<string[]>(["blog"]);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  const fetchHistory = useCallback(async () => {
    const res = await fetch("/api/generate");
    const data = await res.json();
    if (data.history) setHistory(data.history);
    if (data.plan) setPlan(data.plan);
    if (data.monthlyCount !== undefined) setMonthlyCount(data.monthlyCount);
    if (data.monthlyLimit !== undefined) setMonthlyLimit(data.monthlyLimit);
    if (data.allowedFormats) setAllowedFormats(data.allowedFormats);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResult("");
    setError("");
    setSelectedItem(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, format }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
      } else {
        setResult(data.result);
        fetchHistory();
      }
    } catch (err) {
      setError("Erreur serveur. " + (err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  }

  if (isPending || !session) {
    return (
      <div className="flex items-center justify-center h-40">
        <svg className="animate-spin h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  const displayed = selectedItem ?? (result ? { result, format, id: "", created_at: "", prompt } : null);
  const remaining = monthlyLimit !== null ? monthlyLimit - monthlyCount : null;

  return (
    <div className="flex gap-4 h-[calc(100vh-11rem)]">

      {/* ── Gauche : Formulaire + Résultat ── */}
      <div className="flex flex-col gap-3 flex-1 min-w-0 overflow-y-auto">

        {/* Titre + badge plan */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight text-foreground">Générateur de contenu</h1>
            <p className="text-muted-foreground text-xs mt-0.5">Tes notes → contenu prêt à publier.</p>
          </div>
          <div className="flex items-center gap-2">
            {remaining !== null && (
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                remaining === 0
                  ? "bg-red-500/10 text-red-500 border-red-500/20"
                  : remaining <= 2
                  ? "bg-orange-500/10 text-orange-500 border-orange-500/20"
                  : "bg-muted text-muted-foreground border-border"
              }`}>
                {remaining} / {monthlyLimit} ce mois
              </span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${
              plan === "pro" || plan === "studio"
                ? "bg-foreground text-background border-foreground"
                : "bg-muted text-muted-foreground border-border"
            }`}>
              {planLabels[plan] ?? plan}
            </span>
          </div>
        </div>

        {/* Formats */}
        <div className="flex gap-1.5 flex-wrap">
          {formats.map((f) => {
            const isAllowed = allowedFormats.includes(f.id);
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => isAllowed && setFormat(f.id)}
                disabled={!isAllowed}
                title={!isAllowed ? "Disponible avec le plan Pro" : undefined}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200 relative
                  ${!isAllowed
                    ? "border-border/40 text-muted-foreground/30 cursor-not-allowed"
                    : format === f.id
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  }`}
              >
                {f.label}
                {!isAllowed && <span className="ml-1 text-[9px]">🔒</span>}
              </button>
            );
          })}
        </div>

        {/* Textarea + bouton */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Colle ici tes notes brutes, idées ou sujet à développer..."
              rows={7}
              className="w-full resize-none rounded-xl border border-border bg-muted/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
            />
            <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground/40">
              {prompt.length} car.
            </span>
          </div>

          <Button
            type="submit"
            disabled={loading || !prompt.trim() || remaining === 0}
            className="w-full rounded-xl text-sm h-9"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Génération en cours...
              </span>
            ) : remaining === 0
              ? "Limite atteinte — Passe au Pro"
              : "Générer le contenu"
            }
          </Button>
        </form>

        {/* Erreur */}
        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-500">
            {error}
          </div>
        )}

        {/* Résultat */}
        {displayed && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">Résultat</span>
                <span className="text-[10px] text-muted-foreground/60 bg-muted px-2 py-0.5 rounded-full">
                  {formatLabels[displayed.format] ?? displayed.format}
                </span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(displayed.result)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-3 py-0.5"
              >
                Copier
              </button>
            </div>
            <div className="rounded-xl border border-border bg-muted/40 px-5 py-4 text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {displayed.result}
            </div>
          </div>
        )}
      </div>

      {/* ── Droite : Historique ── */}
      <div className="w-56 flex-shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">Historique</span>
          <span className="text-[10px] text-muted-foreground/50">{history.length}/10</span>
        </div>

        <div className="flex flex-col gap-1.5 overflow-y-auto flex-1">
          {history.length === 0 ? (
            <p className="text-xs text-muted-foreground/40 text-center py-6">Aucune génération</p>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                onClick={() => { setSelectedItem(selectedItem?.id === item.id ? null : item); setResult(""); }}
                className={`text-left rounded-xl border px-3 py-2.5 transition-all duration-200
                  ${selectedItem?.id === item.id
                    ? "border-foreground/30 bg-accent"
                    : "border-border/60 bg-muted/30 hover:bg-muted/60"
                  }`}
              >
                <p className="text-xs font-medium text-foreground truncate">
                  {item.prompt.slice(0, 45)}{item.prompt.length > 45 ? "…" : ""}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[10px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded-full">
                    {formatLabels[item.format] ?? item.format}
                  </span>
                  <span className="text-[10px] text-muted-foreground/40">
                    {new Date(item.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Upgrade CTA pour Starter */}
        {plan === "starter" && (
          <a
            href="#pricing"
            className="mt-2 text-center text-xs font-medium text-muted-foreground border border-dashed border-border rounded-xl px-3 py-3 hover:border-foreground/30 hover:text-foreground transition-all"
          >
            Passer au Pro →
          </a>
        )}
      </div>

    </div>
  );
}
