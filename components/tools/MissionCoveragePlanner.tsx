'use client';

import { useMemo, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Slider } from '@/components/tools/Slider';
import { ProjectionChart } from '@/components/tools/BarChart';
import { InsightLog, type LogLine } from '@/components/tools/InsightLog';
import { References } from '@/components/tools/References';

type SiteType = 'linear' | 'area';

function formatMin(n: number): string {
  return `${n.toFixed(1)} min`;
}

export function MissionCoveragePlanner() {
  const [siteType, setSiteType] = useState<SiteType>('linear');
  const [corridorLength, setCorridorLength] = useState(20);
  const [passes, setPasses] = useState(2);
  const [areaHectares, setAreaHectares] = useState(15);
  const [swathWidth, setSwathWidth] = useState(40);
  const [speed, setSpeed] = useState(8);
  const [overlap, setOverlap] = useState(30);
  const [endurance, setEndurance] = useState(25);
  const [swapTime, setSwapTime] = useState(6);

  const model = useMemo(() => {
    const rawDistanceKm =
      siteType === 'linear'
        ? corridorLength * passes
        : (areaHectares * 10000) / swathWidth / 1000;
    const effectiveDistanceKm = rawDistanceKm * (1 + overlap / 100);
    const flightMinutes = (effectiveDistanceKm * 1000) / speed / 60;
    const batteries = Math.max(1, Math.ceil(flightMinutes / endurance));
    const swapMinutes = (batteries - 1) * swapTime;
    const totalMissionMinutes = flightMinutes + swapMinutes;

    const legs = Array.from({ length: batteries }, (_, i) => {
      const remaining = flightMinutes - i * endurance;
      const legMinutes = Math.max(0, Math.min(endurance, remaining));
      return { label: `Battery ${i + 1}`, value: legMinutes, display: formatMin(legMinutes) };
    });

    return { rawDistanceKm, effectiveDistanceKm, flightMinutes, batteries, swapMinutes, totalMissionMinutes, legs };
  }, [siteType, corridorLength, passes, areaHectares, swathWidth, speed, overlap, endurance, swapTime]);

  const log: LogLine[] = [
    {
      label: 'Raw distance to fly',
      detail:
        siteType === 'linear'
          ? `${corridorLength} km corridor × ${passes} pass${passes === 1 ? '' : 'es'} (e.g. both sides of the right-of-way) = ${model.rawDistanceKm.toFixed(1)} km of flight line.`
          : `${areaHectares} hectares ÷ ${swathWidth} m effective swath width × 10,000 m²/hectare ÷ 1,000 = ${model.rawDistanceKm.toFixed(1)} km of flight line to cover the site in parallel passes.`,
    },
    {
      label: 'Adjusted for image overlap',
      detail: `${model.rawDistanceKm.toFixed(1)} km × (1 + ${overlap}% overlap) = ${model.effectiveDistanceKm.toFixed(1)} km effective flight distance - overlap is what makes downstream photogrammetry and change-detection comparisons reliable, so it is flown distance, not waste.`,
    },
    {
      label: 'Flight time at cruise speed',
      detail: `${model.effectiveDistanceKm.toFixed(1)} km ÷ ${speed} m/s cruise speed = ${formatMin(model.flightMinutes)} of total flight time.`,
    },
    {
      label: 'Batteries and swap overhead',
      detail: `${formatMin(model.flightMinutes)} ÷ ${endurance}-minute endurance per battery = ${model.batteries} batter${model.batteries === 1 ? 'y' : 'ies'}, needing ${model.batteries - 1} swap${model.batteries - 1 === 1 ? '' : 's'} at ${swapTime} min each = ${formatMin(model.swapMinutes)} of ground time.`,
    },
    {
      label: 'Total mission time',
      detail: `${formatMin(model.flightMinutes)} flying + ${formatMin(model.swapMinutes)} swapping batteries = ${formatMin(model.totalMissionMinutes)} for this mission, before accounting for setup, weather holds, or site access.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6 sm:p-8">
          <h3 className="text-h3 font-semibold text-ink">Site & coverage</h3>
          <div className="mt-6 space-y-6">
            <div>
              <span className="text-sm font-medium text-ink-secondary">Site type</span>
              <div className="mt-2 flex gap-2">
                {(['linear', 'area'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSiteType(t)}
                    className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                      siteType === t
                        ? 'border-accent/50 bg-accent/10 text-accent'
                        : 'border-line bg-surface text-ink-secondary hover:border-line-strong'
                    }`}
                  >
                    {t === 'linear' ? 'Linear (pipeline corridor)' : 'Area (refinery / plant site)'}
                  </button>
                ))}
              </div>
            </div>

            {siteType === 'linear' ? (
              <>
                <Slider
                  label="Corridor length"
                  value={corridorLength}
                  min={1}
                  max={200}
                  step={1}
                  onChange={setCorridorLength}
                  display={`${corridorLength} km`}
                />
                <Slider
                  label="Passes per corridor"
                  value={passes}
                  min={1}
                  max={4}
                  step={1}
                  onChange={setPasses}
                  display={`${passes}`}
                  help="e.g. 2 for both sides of the right-of-way"
                />
              </>
            ) : (
              <>
                <Slider
                  label="Site area"
                  value={areaHectares}
                  min={1}
                  max={200}
                  step={1}
                  onChange={setAreaHectares}
                  display={`${areaHectares} ha`}
                />
                <Slider
                  label="Effective swath width per pass"
                  value={swathWidth}
                  min={10}
                  max={150}
                  step={5}
                  onChange={setSwathWidth}
                  display={`${swathWidth} m`}
                  help="Depends on altitude and sensor field of view"
                />
              </>
            )}

            <Slider
              label="Required image overlap"
              value={overlap}
              min={0}
              max={80}
              step={5}
              onChange={setOverlap}
              display={`${overlap}%`}
            />
          </div>
        </Card>

        <Card className="flex flex-col justify-between border-accent/30 bg-accent/[0.04] p-6 sm:p-8">
          <div>
            <h3 className="text-h3 font-semibold text-ink">Aircraft & result</h3>
            <div className="mt-6 space-y-6">
              <Slider
                label="Cruise speed"
                value={speed}
                min={2}
                max={20}
                step={1}
                onChange={setSpeed}
                display={`${speed} m/s`}
              />
              <Slider
                label="Battery endurance"
                value={endurance}
                min={10}
                max={50}
                step={1}
                onChange={setEndurance}
                display={`${endurance} min`}
              />
              <Slider
                label="Battery swap time"
                value={swapTime}
                min={1}
                max={20}
                step={1}
                onChange={setSwapTime}
                display={`${swapTime} min`}
              />
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <Stat label="Flight distance" value={`${model.effectiveDistanceKm.toFixed(1)} km`} />
              <Stat label="Flight time" value={formatMin(model.flightMinutes)} />
              <Stat label="Batteries needed" value={`${model.batteries}`} />
              <Stat label="Total mission time" value={formatMin(model.totalMissionMinutes)} accent />
            </div>
          </div>
        </Card>
      </div>

      <ProjectionChart
        data={model.legs}
        caption="Flight time per battery leg - the last leg is typically partial."
      />

      <InsightLog lines={log} />

      <References
        items={[
          {
            label: 'Planning a drone inspection mission (this tool, explained)',
            href: '/blog/mission-coverage-planner-explained',
            note: 'LeakSonic blog - full methodology write-up for this calculator.',
          },
          {
            label: 'Storage tank and terminal drone inspection',
            href: '/blog/storage-tank-terminal-drone-inspection',
            note: 'LeakSonic blog - a common area-coverage inspection scenario.',
          },
          {
            label: 'Meridian GCS - the ground control station we are developing',
            href: '/solutions/meridian-gcs',
            note: 'Waypoint planning, mission scheduling, and companion-computer control in one tool.',
          },
          {
            label: 'ASPRS - American Society for Photogrammetry and Remote Sensing',
            href: 'https://www.asprs.org/',
            note: 'Standards body for the overlap and swath-coverage conventions this tool is based on.',
            external: true,
          },
        ]}
      />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-tile border border-line bg-card p-4">
      <div className={`font-sans text-lg font-bold ${accent ? 'text-accent' : 'text-ink'}`}>
        {value}
      </div>
      <div className="mt-1 text-xs text-ink-muted">{label}</div>
    </div>
  );
}
