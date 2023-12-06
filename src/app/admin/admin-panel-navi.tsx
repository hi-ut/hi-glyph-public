"use client";
import { Listbox, ListboxSection, ListboxItem } from "@nextui-org/listbox";
import { useRouter } from "next/navigation";

export default function AdminPanelNavi({
  items,
}: {
  items: { key: string; label: string }[];
}) {
  const router = useRouter();
  return (
    <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
      <Listbox
        items={items}
        aria-label="Admin Panel Navigation"
        onAction={(key) => {
          router.push(`/admin/${key}`);
        }}
      >
        {/* @ts-ignore */}
        {(item: (typeof items)[number]) => (
          <ListboxItem key={item.key}>{item.label}</ListboxItem>
        )}
      </Listbox>
    </div>
  );
}
