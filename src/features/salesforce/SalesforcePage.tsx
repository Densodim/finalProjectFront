import type { SalesforceState } from "./salesforceSlice"
import {
  fetchAccounts,
  fetchContacts,
  fetchDemo,
  fetchLeads,
  fetchObjects,
} from "./salesforceSlice"

import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts"

const tabs = [
  { key: "accounts", label: "Accounts" },
  { key: "contacts", label: "Contacts" },
  { key: "leads", label: "Leads" },
  { key: "objects", label: "Objects" },
  { key: "demo", label: "Demo" },
]

export default function SalesforcePage() {
  const dispatch = useAppDispatch()
  const [activeTab, setActiveTab] = useState<keyof SalesforceState>("accounts")
  const { accounts, contacts, leads, objects, demo, loading, error } =
    useAppSelector(state => state.salesforce)

  useEffect(() => {
    if (activeTab === "accounts") dispatch(fetchAccounts())
    if (activeTab === "contacts") dispatch(fetchContacts())
    if (activeTab === "leads") dispatch(fetchLeads())
    if (activeTab === "objects") dispatch(fetchObjects())
    if (activeTab === "demo") dispatch(fetchDemo())
  }, [activeTab, dispatch])

  let data: unknown = null
  if (activeTab === "accounts") data = accounts
  if (activeTab === "contacts") data = contacts
  if (activeTab === "leads") data = leads
  if (activeTab === "objects") data = objects
  if (activeTab === "demo") data = demo

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Salesforce Integration</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as keyof SalesforceState)}
            style={{
              fontWeight: activeTab === tab.key ? "bold" : "normal",
              background: activeTab === tab.key ? "#e3e3ff" : "#fff",
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "6px 12px",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {Array.isArray(data) && data.length > 0 ? (
        <table
          style={{ width: "100%", borderCollapse: "collapse", marginTop: 16 }}
        >
          <thead>
            <tr>
              {Object.keys(data[0]).map(key => (
                <th
                  key={key}
                  style={{
                    border: "1px solid #ddd",
                    padding: 8,
                    background: "#f5f5f5",
                  }}
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={(item as any).Id || (item as any).id || idx}>
                {Object.keys(data[0]).map(key => (
                  <td
                    key={key}
                    style={{ border: "1px solid #eee", padding: 8 }}
                  >
                    {typeof (item as any)[key] === "object" &&
                    (item as any)[key] !== null
                      ? JSON.stringify((item as any)[key])
                      : String((item as any)[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : data && typeof data === "object" ? (
        <pre
          style={{
            background: "#f8f8f8",
            padding: 16,
            borderRadius: 8,
            overflow: "auto",
            marginTop: 16,
          }}
        >
          {JSON.stringify(data, null, 2)}
        </pre>
      ) : null}
    </div>
  )
}
