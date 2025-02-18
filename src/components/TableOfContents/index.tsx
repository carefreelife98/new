"use client";

import React, { useState } from "react";
import { toc } from "mdast-util-toc";
import { unified } from "unified";
import remarkParse from "remark-parse";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import {List} from "mdast-util-toc/lib";

interface TableOfContentsProps {
    content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
    const [isVisible, setIsVisible] = useState(true);

    const tree = unified().use(remarkParse).parse(content);
    const tableOfContents = toc(tree);

    function generateId(value: string): string {
        return value
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }

    function renderToc(node: List | undefined, depth = 0): React.ReactNode {
        if (!node || !node.children) return null;

        return (
            <div className={`flex flex-col space-y-1 ${depth === 0 ? '' : 'ml-4 mt-1'}`}>
                {node.children.map((item: any, index: number) => {
                    const headingNode = item.children[0]?.children[0]?.children[0];
                    if (!headingNode || headingNode?.type !== 'text') {
                        return null;
                    }
                    const headingText = headingNode.value;
                    const url = item.children[0]?.children[0]?.url;
                    const id = generateId(headingText);

                    return (
                        <div key={index} className="relative">
                            <div className="flex items-center group">
                                {item.children[1] && (
                                    <ChevronRight
                                        className="w-4 h-4 absolute -left-5 top-1 text-gray-400 transition-transform group-hover:text-gray-600 group-hover:rotate-90 duration-200"
                                    />
                                )}
                                <a href={url}
                                   className={`
                                       block py-1 px-2 rounded-md text-sm w-full
                                       hover:bg-gray-100 dark:hover:bg-gray-800
                                       text-gray-700 dark:text-gray-300
                                       hover:text-gray-900 dark:hover:text-gray-100
                                       transition-all duration-200
                                       ${depth === 0 ? 'font-medium' : 'font-normal'}
                                   `}
                                >
                                    {headingText}
                                </a>
                            </div>
                            {item.children[1] && renderToc(item.children[1], depth + 1)}
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <Card className="w-64">
            <CardHeader className="px-4 py-3 border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">목차</CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisible(!isVisible)}
                        className="h-8 px-2"
                    >
                        {isVisible ? "Hide" : "Show"}
                    </Button>
                </div>
            </CardHeader>

            {isVisible && (
                <CardContent className="p-0">
                    <ScrollArea className="h-[calc(90vh-8rem)] px-4 py-2">
                        <nav>{renderToc(tableOfContents.map)}</nav>
                    </ScrollArea>
                </CardContent>
            )}
        </Card>
    );
}