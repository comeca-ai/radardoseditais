const MONTHS = [
  "janeiro",
  "fevereiro",
  "marco",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function doeUrlFor(date = new Date(), timeZone = "America/Recife"): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const year = parts.find((p) => p.type === "year")?.value ?? "2026";
  const month = parts.find((p) => p.type === "month")?.value ?? "09";
  const day = parts.find((p) => p.type === "day")?.value ?? "09";
  const monthName = MONTHS[Number(month) - 1] ?? "setembro";
  return `https://auniao.pb.gov.br/servicos/doe/${year}/${monthName}/diario-oficial-${day}-${month}-${year}-portal.pdf`;
}

export async function probeDoe(url: string): Promise<{
  ok: boolean;
  status: number;
  bytes: number | null;
}> {
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { Range: "bytes=0-1023" },
    });
    const len = res.headers.get("content-length");
    return {
      ok: res.ok || res.status === 206,
      status: res.status,
      bytes: len ? Number(len) : null,
    };
  } catch {
    return { ok: false, status: 0, bytes: null };
  }
}

export async function probeDomJp(): Promise<{ ok: boolean; status: number }> {
  try {
    const res = await fetch("https://www.joaopessoa.pb.gov.br/", {
      method: "GET",
      redirect: "follow",
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false, status: 0 };
  }
}
