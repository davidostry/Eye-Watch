import type { Arena, Priority } from "../types/alert";

type FiltersProps = {
    search: string;
    arena: Arena | "";
    priority: Priority | "";

    onSearchChange: (
        value: string
    ) => void;

    onArenaChange: (
        value: Arena | ""
    ) => void;

    onPriorityChange: (
        value: Priority | ""
    ) => void;
};

function Filters({
    search,
    arena,
    priority,
    onSearchChange,
    onArenaChange,
    onPriorityChange
}: FiltersProps) {

    return (
        <div className="filters">

            <input
                placeholder="Search by name..."
                value={search}
                onChange={(event) =>
                    onSearchChange(
                        event.target.value
                    )
                }
            />

            <select
                value={arena}
                onChange={(event) =>
                    onArenaChange(
                        event.target.value as Arena | ""
                    )
                }
            >
                <option value="">
                    All arenas
                </option>

                <option value="North">
                    North
                </option>

                <option value="Center">
                    Center
                </option>

                <option value="South">
                    South
                </option>
            </select>

            <select
                value={priority}
                onChange={(event) =>
                    onPriorityChange(
                        event.target.value as Priority | ""
                    )
                }
            >
                <option value="">
                    All priorities
                </option>

                <option value="Low">
                    Low
                </option>

                <option value="Medium">
                    Medium
                </option>

                <option value="High">
                    High
                </option>

                <option value="Critical">
                    Critical
                </option>
            </select>

        </div>
    );
}

export default Filters;