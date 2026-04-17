/**
 * Kanboard JSON-RPC client.
 *
 * Server-only. Do not import from Client Components.
 * Talks to the Kanboard instance configured via env vars:
 *   - KANBOARD_API_URL    e.g. https://tasks.boostyour.app/jsonrpc.php
 *   - KANBOARD_API_USER   Kanboard username (or "jsonrpc" for app-level token)
 *   - KANBOARD_API_TOKEN  personal API token or application API token
 *
 * Docs: https://docs.kanboard.org/en/latest/api/introduction.html
 */

type JsonRpcRequest = {
  jsonrpc: "2.0";
  method: string;
  id: number;
  params?: Record<string, unknown>;
};

type JsonRpcResponse<T> = {
  jsonrpc: "2.0";
  id: number;
  result?: T;
  error?: { code: number; message: string; data?: unknown };
};

export class KanboardError extends Error {
  code?: number;
  data?: unknown;
  constructor(message: string, code?: number, data?: unknown) {
    super(message);
    this.name = "KanboardError";
    this.code = code;
    this.data = data;
  }
}

function getConfig() {
  const url = process.env.KANBOARD_API_URL;
  const user = process.env.KANBOARD_API_USER;
  const token = process.env.KANBOARD_API_TOKEN;
  if (!url || !user || !token) {
    throw new KanboardError(
      "Kanboard env vars missing. Set KANBOARD_API_URL, KANBOARD_API_USER, KANBOARD_API_TOKEN.",
    );
  }
  return { url, user, token };
}

let requestId = 0;

/**
 * Low-level JSON-RPC call. Prefer the typed helpers below for known methods.
 */
export async function kanboardCall<T = unknown>(
  method: string,
  params?: Record<string, unknown>,
): Promise<T> {
  const { url, user, token } = getConfig();
  const body: JsonRpcRequest = {
    jsonrpc: "2.0",
    method,
    id: ++requestId,
    ...(params ? { params } : {}),
  };

  const auth = Buffer.from(`${user}:${token}`).toString("base64");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new KanboardError(
      `Kanboard HTTP ${res.status} ${res.statusText}`,
      res.status,
    );
  }

  const json = (await res.json()) as JsonRpcResponse<T>;
  if (json.error) {
    throw new KanboardError(json.error.message, json.error.code, json.error.data);
  }
  if (json.result === undefined) {
    throw new KanboardError(`Empty result for method "${method}"`);
  }
  return json.result;
}

// ─── Types ──────────────────────────────────────────────────────────────────

export type KanboardProject = {
  id: number;
  name: string;
  is_active: number;
  description: string;
  url: { board: string; list: string };
};

export type KanboardColumn = {
  id: number;
  title: string;
  position: number;
  project_id: number;
  task_limit: number;
  description: string;
};

export type KanboardTask = {
  id: number;
  title: string;
  description: string;
  project_id: number;
  column_id: number;
  position: number;
  owner_id: number;
  is_active: number;
  date_creation: number;
  date_modification: number;
  color_id: string;
  swimlane_id: number;
  reference: string;
};

// ─── Typed helpers ──────────────────────────────────────────────────────────

export const kanboard = {
  me: () => kanboardCall<{ id: number; username: string; role: string }>("getMe"),

  // Projects
  listProjects: () => kanboardCall<KanboardProject[]>("getAllProjects"),
  getProject: (project_id: number) =>
    kanboardCall<KanboardProject>("getProjectById", { project_id }),
  getProjectByName: (name: string) =>
    kanboardCall<KanboardProject | null>("getProjectByName", { name }),
  createProject: (params: { name: string; description?: string }) =>
    kanboardCall<number>("createProject", params),

  // Columns
  getColumns: (project_id: number) =>
    kanboardCall<KanboardColumn[]>("getColumns", { project_id }),

  // Tasks
  listTasks: (project_id: number, status_id: 0 | 1 = 1) =>
    kanboardCall<KanboardTask[]>("getAllTasks", { project_id, status_id }),
  getTask: (task_id: number) =>
    kanboardCall<KanboardTask>("getTask", { task_id }),
  createTask: (params: {
    title: string;
    project_id: number;
    column_id?: number;
    description?: string;
    color_id?: string;
    owner_id?: number;
  }) => kanboardCall<number>("createTask", params),
  moveTask: (params: {
    project_id: number;
    task_id: number;
    column_id: number;
    position: number;
    swimlane_id?: number;
  }) => kanboardCall<boolean>("moveTaskPosition", params),
  closeTask: (task_id: number) =>
    kanboardCall<boolean>("closeTask", { task_id }),
};
