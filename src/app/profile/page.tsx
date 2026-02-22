"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const planDetails: Record<string, { label: string; color: string; limit: number | null; formats: string[]; price: string }> = {
  starter: {
    label: "Starter",
    color: "bg-muted text-muted-foreground border-border",
    limit: 5,
    formats: ["Article de blog"],
    price: "Gratuit",
  },
  pro: {
    label: "Pro",
    color: "bg-foreground text-background border-foreground",
    limit: null,
    formats: ["Article de blog", "Newsletter", "Thread LinkedIn", "Libre"],
    price: "29€ / mois",
  },
  studio: {
    label: "Studio",
    color: "bg-foreground text-background border-foreground",
    limit: null,
    formats: ["Article de blog", "Newsletter", "Thread LinkedIn", "Libre", "API & webhooks"],
    price: "Sur mesure",
  },
};

const formatLabels: Record<string, string> = {
  blog: "Blog",
  newsletter: "Newsletter",
  linkedin: "LinkedIn",
  libre: "Libre",
};

type ProfileData = {
  user: { id: string; name: string; email: string; plan: string; createdAt: string };
  stats: { totalCount: number; monthlyCount: number };
  recentGenerations: { id: string; created_at: string; format: string; prompt: string }[];
};

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [planModal, setPlanModal] = useState(false);
  const [changingPlan, setChangingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) router.push("/login");
  }, [session, isPending, router]);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((d) => { setData(d); setNewName(d.user?.name ?? ""); })
      .finally(() => setLoading(false));
  }, []);

  async function handleSaveName() {
    setSaving(true);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    if (res.ok) {
      setSaveMsg("Nom mis à jour !");
      setEditingName(false);
      setData((prev) => prev ? { ...prev, user: { ...prev.user, name: newName } } : prev);
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(""), 3000);
  }

  async function handleChangePlan(newPlan: string) {
    if (newPlan === data?.user.plan) { setPlanModal(false); return; }
    setChangingPlan(newPlan);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: newPlan }),
    });
    if (res.ok) {
      setData((prev) => prev ? { ...prev, user: { ...prev.user, plan: newPlan } } : prev);
      setSaveMsg("Plan mis à jour !");
      setTimeout(() => setSaveMsg(""), 3000);
    }
    setChangingPlan(null);
    setPlanModal(false);
  }

  if (isPending || loading || !data) {
    return (
      <div className="flex items-center justify-center h-40">
        <svg className="animate-spin h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  const { user, stats, recentGenerations } = data;
  const plan = planDetails[user.plan] ?? planDetails.starter;
  const initials = user.name?.slice(0, 2).toUpperCase() ?? user.email.slice(0, 2).toUpperCase();
  const remaining = plan.limit !== null ? plan.limit - stats.monthlyCount : null;

  return (
    <div className="max-w-3xl mx-auto py-8 px-2 flex flex-col gap-6">

      {/* ── Avatar + Nom + Email ── */}
      <div className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-muted/30">
        <div className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center text-xl font-black flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="text-lg font-bold bg-transparent border-b border-foreground outline-none text-foreground w-48"
                autoFocus
              />
              <button onClick={handleSaveName} disabled={saving} className="text-xs font-semibold text-foreground hover:opacity-70">
                {saving ? "..." : "Sauvegarder"}
              </button>
              <button onClick={() => setEditingName(false)} className="text-xs text-muted-foreground hover:text-foreground">
                Annuler
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-foreground">{user.name}</h1>
              <button onClick={() => setEditingName(true)} className="text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
            </div>
          )}
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground/50 mt-1">
            Membre depuis {new Date(user.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          {saveMsg && <p className="text-xs text-green-500 mt-1">{saveMsg}</p>}
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${plan.color}`}>
          {plan.label}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* ── Stats ── */}
        <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border bg-muted/30">
          <h2 className="text-sm font-semibold text-foreground">Statistiques</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-0.5 p-3 rounded-xl bg-background border border-border">
              <span className="text-2xl font-black text-foreground">{stats.totalCount}</span>
              <span className="text-xs text-muted-foreground">Générations totales</span>
            </div>
            <div className="flex flex-col gap-0.5 p-3 rounded-xl bg-background border border-border">
              <span className="text-2xl font-black text-foreground">{stats.monthlyCount}</span>
              <span className="text-xs text-muted-foreground">Ce mois-ci</span>
            </div>
          </div>
          {remaining !== null && (
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Limite mensuelle</span>
                <span>{stats.monthlyCount} / {plan.limit}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${remaining === 0 ? "bg-red-500" : remaining <= 2 ? "bg-orange-400" : "bg-foreground"}`}
                  style={{ width: `${Math.min((stats.monthlyCount / (plan.limit ?? 1)) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Plan ── */}
        <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Mon plan</h2>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${plan.color}`}>
              {plan.label}
            </span>
          </div>
          <ul className="flex flex-col gap-1.5 flex-1">
            {plan.formats.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-foreground/70">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {f}
              </li>
            ))}
            <li className="flex items-center gap-2 text-xs text-foreground/70">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {plan.limit === null ? "Générations illimitées" : `${plan.limit} générations / mois`}
            </li>
          </ul>
          <Button
            size="sm"
            variant="outline"
            className="w-full rounded-xl text-xs mt-1"
            onClick={() => setPlanModal(true)}
          >
            Changer de plan
          </Button>
        </div>
      </div>

      {/* ── Générations récentes ── */}
      {recentGenerations.length > 0 && (
        <div className="flex flex-col gap-3 p-6 rounded-2xl border border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Générations récentes</h2>
            <Link href="/generate" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Voir tout →
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {recentGenerations.map((g) => (
              <div key={g.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border">
                <span className="text-[10px] font-medium text-muted-foreground/60 bg-muted px-2 py-0.5 rounded-full flex-shrink-0">
                  {formatLabels[g.format] ?? g.format}
                </span>
                <p className="text-xs text-foreground/70 truncate flex-1">
                  {g.prompt.slice(0, 70)}{g.prompt.length > 70 ? "…" : ""}
                </p>
                <span className="text-[10px] text-muted-foreground/40 flex-shrink-0">
                  {new Date(g.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Modal Changer de plan ── */}
      {planModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setPlanModal(false)} />
          <div className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-4xl p-10 flex flex-col gap-8">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-foreground">Changer de plan</h2>
                <p className="text-sm text-muted-foreground mt-1">Le changement prend effet immédiatement.</p>
              </div>
              <button onClick={() => setPlanModal(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {Object.entries(planDetails).map(([key, p]) => {
                const isCurrent = user.plan === key;
                const isLoading = changingPlan === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleChangePlan(key)}
                    disabled={!!changingPlan}
                    className={`flex flex-col gap-6 p-7 rounded-2xl border text-left transition-all duration-200
                      ${isCurrent
                        ? "border-foreground bg-accent"
                        : "border-border hover:border-foreground/40 hover:bg-accent/50"
                      }`}
                  >
                    {/* Badge + coche */}
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${p.color}`}>
                        {p.label}
                      </span>
                      {isCurrent && (
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                          <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>

                    {/* Prix */}
                    <div>
                      <p className="text-3xl font-black text-foreground">{p.price}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {p.limit === null ? "Générations illimitées" : `${p.limit} générations / mois`}
                      </p>
                    </div>

                    {/* Formats */}
                    <ul className="flex flex-col gap-3 flex-1">
                      {p.formats.map((f) => (
                        <li key={f} className="text-sm text-foreground/70 flex items-center gap-2.5">
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className={`text-sm font-semibold text-center py-3 rounded-xl transition-all border
                      ${isCurrent
                        ? "border-border text-muted-foreground"
                        : "border-foreground bg-foreground text-background"
                      }`}>
                      {isLoading ? "..." : isCurrent ? "Plan actuel" : "Choisir ce plan"}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
