"use client";

import { useState } from "react";

interface DateTimePickerProps {
  onSchedule: (dateTime: string) => void;
  onCancel: () => void;
}

export default function DateTimePicker({ onSchedule, onCancel }: DateTimePickerProps) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split("T")[0];

  const [date, setDate] = useState(defaultDate);
  const [time, setTime] = useState("10:00");

  const handleSchedule = () => {
    const dateTime = new Date(`${date}T${time}:00`).toISOString();
    onSchedule(dateTime);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    border: "2px solid #f3f5fc",
    borderRadius: 10,
    fontFamily: "var(--font-source), sans-serif",
    fontSize: 15,
    color: "#191e41",
    outline: "none",
    background: "#fafbff",
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#191e41",
            display: "block",
            marginBottom: 8,
          }}
        >
          Date
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={defaultDate}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#f3f5fc")}
        />
      </div>
      <div>
        <label
          style={{
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#191e41",
            display: "block",
            marginBottom: 8,
          }}
        >
          Time
        </label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#ea4c89")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "#f3f5fc")}
        />
      </div>
      <div className="flex gap-3" style={{ marginTop: 8 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            padding: "12px 20px",
            borderRadius: 10,
            border: "2px solid #e8ebf5",
            background: "transparent",
            color: "#636788",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={handleSchedule}
          style={{
            flex: 1,
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            background: "#ea4c89",
            color: "#ffffff",
            fontFamily: "var(--font-mona), sans-serif",
            fontWeight: 600,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Schedule Post
        </button>
      </div>
    </div>
  );
}
