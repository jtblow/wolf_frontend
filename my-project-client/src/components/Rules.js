import React from "react";

const Rules = props => {
  return (
    <div className="Rules">
      <h1>Game Rules</h1>
      <h4>Starting</h4>
      <ol type="i">
        <li>
          All four players agree upon a starting wager that will be applied per
          hole, per player
        </li>
        <br />
        <li>
          The order in which players tee off needs to be randomly determined
          (this app does that for you). This order remains consistent throughout
          the match, only shifting the player who tees off first.
        </li>

        <h4>GamePlay</h4>
        <li>The player who tees off first assumes the role of "Wolf"</li>
        <li>
          Before teeing off, the wolf can choose to go "Blind Wolf", which
          triples the current wager. The wolf then faces off against all three
          other players to win the hole. If the wolf has the a lowest score,
          they win the tripled wager. If any of the other 3 players have the
          highest score, all three of them win 1/3 of the tripled wager.
        </li>
        <br />
        <li>
          {" "}
          Immediately after teeing off, the wolf can choose to "howl", which has
          the exact same set up as "Blind Wolf", but it doubles the bet instead
          of tripling it.
        </li>
        <br />
        <li>
          If the wolf does not go blind or howl, the second player in order tees
          off. The wolf then has the choice to team up with that player for the
          hole, or wait to see the next player. After the next player tees off,
          the wolf can no longer choose the previous player.
        </li>
        <br />
        <li>
          The same rule applies after the third and fourth players tee off.
          However, after the fourth player goes the wolf has an additional
          choice to go "Lone", which carries the same rules as "Blind" and
          "Howl", but at the normal bet level.
        </li>
        <br />
        <li>
          If the hole ends in a tie, the wager is carried over to the next hole.
        </li>
      </ol>
    </div>
    // <ol type="i">
    //   <li>The player who tees off first assumes the role of "Wolf"</li>
    //   // <li>Before teeing off, the wolf can choose to go "Blind Wolf", which triples the current wager. The wolf then faces off against all three other players to win the whole. If the wolf has the highest score, they win the tripled wager. If one of the other 3 players have the highest score, all three of them win 1/3 of the tripled wager.</li>
    //   <ol/>
  );
};
export default Rules;
