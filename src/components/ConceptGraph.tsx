"use client";
import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";
import { concepts } from "@/lib/concepts";
import { useProgress } from "./ProgressProvider";

type Props = { selected: string; onSelect: (id: string) => void; height?: number };

export default function ConceptGraph({ selected, onSelect, height = 580 }: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  const { completed } = useProgress();

  const { nodes, links } = useMemo(() => {
    const ids = Object.keys(concepts);
    const nodes = ids.map((id) => ({ id, title: concepts[id].title }));
    const links = ids.flatMap((id) =>
      concepts[id].prereqs.map((p) => ({ source: p, target: id }))
    );
    return { nodes, links };
  }, []);

  useEffect(() => {
    const svg = d3.select(ref.current!);
    svg.selectAll("*").remove();

    const width = ref.current!.clientWidth;
    // height is now passed as prop

    const simulation = d3
      .forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-160))
      .force("link", d3.forceLink(links as any).id((d: any) => d.id).distance(110))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const g = svg.append("g");

    // zoom/pan
    svg.call(
      d3.zoom<SVGSVGElement, unknown>().on("zoom", (e) => {
        g.attr("transform", e.transform);
      })
    );

    const link = g
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("stroke", "#334155")
      .attr("stroke-width", 1.2)
      .attr("marker-end", "url(#arrow)");

    const node = g
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .on("click", (_, d: any) => onSelect(d.id));

    node
      .append("circle")
      .attr("r", (d: any) => (d.id === selected ? 20 : 13))
      .attr("fill", (d: any) =>
        d.id === "vasocomputation" ? "#0ea5e9" : completed.has(d.id) ? "#10b981" : "#94a3b8"
      )
      .attr("stroke", "#0b1020")
      .attr("stroke-width", 2)
      .style("filter", (d: any) => (d.id === selected ? "drop-shadow(0 0 10px rgba(14,165,233,.6))" : "none"));

    node
      .append("text")
      .text((d: any) => concepts[d.id].title)
      .attr("x", 20)
      .attr("y", 5)
      .attr("fill", "#e2e8f0")
      .attr("font-size", 12);

    // defs for arrowheads
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 18)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#334155");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => (d.source as any).x)
        .attr("y1", (d: any) => (d.source as any).y)
        .attr("x2", (d: any) => (d.target as any).x)
        .attr("y2", (d: any) => (d.target as any).y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links, onSelect, selected, completed]);

  return <svg ref={ref} className="w-full" style={{ height }}></svg>;
}