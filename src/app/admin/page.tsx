"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

const PLANS = ["starter", "pro", "studio"];

const planColors: Record<string, string> = {
  starter: "bg-muted text-muted-foreground border-border",
  pro: "bg-foreground text-background border-foreground",
  studio: "bg-foreground text-background border-foreground",
};

type User = {
  id: string;
  name: string;
  email: string;
  plan: string;
  createdAt: string;
  totalGenerations: number;
  monthlyGenerations: number;
};

export default function AdminPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [changingId, setChangingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isPending && !session) { router.push("/login"); return; }
  }, [session, isPending, router]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) { setError(d.error); return; }
        setUsers(d.users);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(userId: string) {
    setDeletingId(userId);
    const res = await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
    setDeletingId(null);
    setConfirmId(null);
  }

  async function handlePlanChange(userId: string, plan: string) {
    setChangingId(userId);
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, plan }),
    });
    if (res.ok) {
      setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, plan } : u));
    }
    setChangingId(null);
  }

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <svg className="animate-spin h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  const filtered = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalUsers = users.length;
  const proUsers = users.filter((u) => u.plan === "pro" || u.plan === "studio").length;
  const totalGen = users.reduce((s, u) => s + u.totalGenerations, 0);
  const monthlyGen = users.reduce((s, u) => s + u.monthlyGenerations, 0);

  return (
    <div className="flex flex-col gap-6 py-6">

      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">Dashboard Admin</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Gestion des utilisateurs et des plans</p>
        </div>
        <span className="text-xs font-semibold bg-red-500/10 text-red-500 border border-red-500/20 px-3 py-1 rounded-full">
          Admin
        </span>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Utilisateurs", value: totalUsers },
          { label: "Plans payants", value: proUsers },
          { label: "Générations totales", value: totalGen },
          { label: "Générations ce mois", value: monthlyGen },
        ].map((s) => (
          <div key={s.label} className="flex flex-col gap-1 p-4 rounded-2xl border border-border bg-muted/30">
            <span className="text-2xl font-black text-foreground">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Recherche */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou email..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />
      </div>

      {/* Tableau */}
      <div className="rounded-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto_auto] gap-4 px-5 py-3 bg-muted/50 border-b border-border text-xs font-semibold text-muted-foreground">
          <span>Utilisateur</span>
          <span>Email</span>
          <span className="text-center">Plan</span>
          <span className="text-center">Total</span>
          <span className="text-center">Ce mois</span>
          <span>Inscription</span>
          <span></span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground/50">
              Aucun utilisateur trouvé
            </div>
          ) : (
            filtered.map((user) => {
              const initials = user.name?.slice(0, 2).toUpperCase() ?? user.email.slice(0, 2).toUpperCase();
              return (
                <div key={user.id} className="grid grid-cols-[1fr_1fr_auto_auto_auto_auto_auto] gap-4 px-5 py-4 items-center hover:bg-muted/30 transition-colors">

                  {/* Nom */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <span className="text-sm font-medium text-foreground truncate">{user.name || "—"}</span>
                  </div>

                  {/* Email */}
                  <span className="text-sm text-muted-foreground truncate">{user.email}</span>

                  {/* Plan (select) */}
                  <div className="flex justify-center">
                    {changingId === user.id ? (
                      <svg className="animate-spin h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <select
                        value={user.plan}
                        onChange={(e) => handlePlanChange(user.id, e.target.value)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full border cursor-pointer appearance-none text-center ${planColors[user.plan] ?? planColors.starter}`}
                      >
                        {PLANS.map((p) => (
                          <option key={p} value={p} className="bg-background text-foreground capitalize">
                            {p.charAt(0).toUpperCase() + p.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Total générations */}
                  <span className="text-sm text-foreground font-semibold text-center">{user.totalGenerations}</span>

                  {/* Mois */}
                  <span className="text-sm text-muted-foreground text-center">{user.monthlyGenerations}</span>

                  {/* Date */}
                  <span className="text-xs text-muted-foreground/60 whitespace-nowrap">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "2-digit" })}
                  </span>

                  {/* Supprimer */}
                  <div className="flex justify-center">
                    {deletingId === user.id ? (
                      <svg className="animate-spin h-4 w-4 text-red-400" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <button
                        onClick={() => setConfirmId(user.id)}
                        className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        title="Supprimer l'utilisateur"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal confirmation suppression */}
      {confirmId && (() => {
        const u = users.find((x) => x.id === confirmId);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setConfirmId(null)} />
            <div className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-red-500">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">Supprimer l&apos;utilisateur</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Cette action est irréversible.</p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 border border-border px-4 py-3">
                <p className="text-sm font-semibold text-foreground">{u?.name || "—"}</p>
                <p className="text-xs text-muted-foreground">{u?.email}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{u?.totalGenerations} génération{(u?.totalGenerations ?? 0) > 1 ? "s" : ""} · Plan {u?.plan}</p>
              </div>

              <p className="text-xs text-muted-foreground/70">
                Toutes ses générations et sa session seront supprimées définitivement.
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => handleDelete(confirmId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      <p className="text-xs text-muted-foreground/40 text-center">
        {filtered.length} utilisateur{filtered.length > 1 ? "s" : ""} · Accès restreint à {process.env.NEXT_PUBLIC_ADMIN_HINT ?? "l'administrateur"}
      </p>
    </div>
  );
}
