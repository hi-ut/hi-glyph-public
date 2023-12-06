"use client";

import { GlyphData } from "@prisma/client";
import { GlyphSvg } from "@/components/GlyphSvg";
import * as NextLink from "next/link";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  SortDescriptor,
} from "@nextui-org/table";

import { Button, ButtonGroup } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { SmallDownArrow } from "@/components/icons/small-down-arrow";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const columns = [
  {
    key: "name",
    label: "字形名",
    sortable: true,
  },
  {
    key: "svg",
    label: "字形画像",
  },
  {
    key: "related",
    label: "関連漢字",
    sortable: true,
  },
  // {
  //   key: "data",
  //   label: "字形データ",
  // },
  {
    key: "publicAccess",
    label: "外部に公開",
    sortable: true,
  },
  {
    key: "creator",
    label: "作成者",
    sortable: true,
  },
  // {
  //   key: "tag",
  //   label: "タグ",
  // },
  {
    key: "actions",
    label: "操作",
  },
];

type GlyphDataWithCreator = GlyphData & {
  creator: { name: string; email: string };
};

function Results({ glyphs }: { glyphs: GlyphDataWithCreator[] }) {
  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>();
  const [isLoading, setIsLoading] = useState(true);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const renderCell = useCallback(
    (item: GlyphDataWithCreator, columnKey: React.Key) => {
      switch (columnKey) {
        case "name":
          return <Link href={`/glyphs/${item.name}`}>{item.name}</Link>;
        case "svg":
          // TODO: use <Image> instead of <img>, loading from s3
          return (
            <img
              width={32}
              height={32}
              src={`/glyphs/${item.name}/image.svg`}
              alt={`${item.name} SVG Image`}
            />
          );
        case "publicAccess":
          return item.publicAccess ? "公開" : "非公開";
        case "creator":
          return (
            <div className="flex flex-col">
              <span className="text">{item.creator.name}</span>
              <span className="text-xs text-gray-400">{item.creator.email}</span>
            </div>
          );
        case "actions":
          return (
            <ButtonGroup>
              <Button
                size="sm"
                as={Link}
                href={`/glyphs/${item.name}/edit`}
                color="success"
              >
                編集
              </Button>
              <Button
                size="sm"
                as={Link}
                href={`/glyphs/${item.name}/delete`}
                color="danger"
              >
                削除
              </Button>
            </ButtonGroup>
          );
        default:
          return getKeyValue(item, columnKey);
      }
    },
    []
  );

  const length = glyphs.length;

  const sortedItems = useMemo(() => {
    return [...glyphs].sort(
      (a: GlyphDataWithCreator, b: GlyphDataWithCreator) => {
        const first = a[
          sortDescriptor.column as keyof GlyphDataWithCreator
        ] as number;
        const second = b[
          sortDescriptor.column as keyof GlyphDataWithCreator
        ] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      }
    );
  }, [sortDescriptor, glyphs]);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 max-w-7xl py-4">
        <div className="flex justify-between items-end gap-3">
          <Input placeholder="検索" />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  endContent={<SmallDownArrow className="text-sm" />}
                >
                  公開範囲
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectionMode="multiple"
              >
                <DropdownItem>外部</DropdownItem>
                <DropdownItem>内部</DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <ButtonGroup>
              <Button as={Link} href="/glyphs/add" color="success">
                出力
              </Button>
              <Button as={Link} href="/glyphs/add" color="danger">
                削除
              </Button>
            </ButtonGroup>
            <Button as={Link} href="/glyphs/add" color="primary">
              作成
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span>結果数：{length}</span>
          <div>rows per page</div>
        </div>
      </div>
    );
  }, [length]);

  return (
    <Table
      aria-label="Controlled table example with dynamic content"
      topContent={topContent}
      topContentPlacement="outside"
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      // onSelectionChange={setSelectedKeys}
      onRowAction={(glyphName) => router.push(`/glyphs/${glyphName}`)}
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.key} allowsSorting={column.sortable}>
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={sortedItems}
        emptyContent={"字形は見つかりませんでした。"}
      >
        {(item) => (
          <TableRow key={item.name}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default Results;
