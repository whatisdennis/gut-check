"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { runReality, buildScreens, totalQuestions, type Answers } from "@/lib/engine";
import { TYPE_RISKS, type ProductType } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { ProgressHeader } from "./ProgressHeader";
import { listVariants, itemVariants } from "@/lib/motion";

export function RealityCheck({
  ptype,
  answers,
  onBack,
  onExport,
}: {
  ptype: ProductType;
  answers: Answers;
  onBack: () => void;
  onExport: () => void;
}) {
  const risks = runReality(answers, ptype);
  const total = totalQuestions(buildScreens(ptype));
  const hasTypeRisks = !!TYPE_RISKS[ptype];

  return (
    <div>
      <ProgressHeader
        pct={100}
        eyebrow="The reality check"
        rightText={`all ${total} questions done · 0 left`}
      />

      <div className="rounded-m3-md border border-outline-variant bg-surface-container-low p-6 shadow-m3-1">
        <h2 className="text-[22px] font-normal text-on-surface">Your riskiest assumptions</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Read from your own answers{hasTypeRisks ? ` and known ${ptype} traps` : ""}. Not a
          scolding. A to-do list before you write code.
        </p>

        <motion.div className="mt-4" variants={listVariants} initial="initial" animate="animate">
          {risks.map((r) => (
            <motion.div
              key={r.h}
              variants={itemVariants}
              className="mb-2.5 rounded-m3-sm border border-l-[3px] border-outline-variant border-l-primary bg-surface-container-lowest p-3.5"
            >
              <h4 className="text-[15px] font-medium text-on-surface">{r.h}</h4>
              <p className="mt-1.5 text-[13px] text-on-surface-variant">
                <span className="font-medium text-primary">This week:</span> {r.t}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-5 flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft /> Back
          </Button>
          <Button onClick={onExport}>
            Get my brief <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
