import React from "react";
import { SkeletonCard } from "./SkeletonCard";
import type { SkeletonListProps } from "../types/component.types";

export const SkeletonList: React.FC<SkeletonListProps> = ({ count }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
