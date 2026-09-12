import { useState } from 'react';
import type { ArchitectureTreeNode } from '../../types/projectTypes';

interface Props {
  tree: ArchitectureTreeNode;
  description?: string;
}

const TreeNodeItem = ({
  node,
  depth = 0,
  isLast = false,
}: {
  node: ArchitectureTreeNode;
  depth?: number;
  isLast?: boolean;
}) => {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`pv-tree-item depth-${depth} ${isLast ? 'is-last' : ''}`}>
      <div className="pv-tree-node-card">
        <div className="pv-tree-node-main">
          {hasChildren && (
            <button
              className="pv-tree-toggle-btn"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Collapse branch' : 'Expand branch'}
              title={isExpanded ? 'Collapse branch' : 'Expand branch'}
            >
              <span className={`pv-tree-toggle-icon ${isExpanded ? 'open' : ''}`}>
                ▸
              </span>
            </button>
          )}

          {!hasChildren && <span className="pv-tree-leaf-bullet" />}

          <div className="pv-tree-node-content">
            <div className="pv-tree-node-header">
              <span className="pv-tree-node-name">{node.name}</span>
              {node.badge && (
                <span className="pv-tree-badge">{node.badge}</span>
              )}
            </div>
            {node.description && (
              <p className="pv-tree-node-desc">{node.description}</p>
            )}
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="pv-tree-children">
          {node.children!.map((child, index) => (
            <TreeNodeItem
              key={child.name + index}
              node={child}
              depth={depth + 1}
              isLast={index === node.children!.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ArchitectureTree = ({ tree, description }: Props) => {
  const [allExpandedKey, setAllExpandedKey] = useState(0);

  return (
    <div className="pv-architecture-tree-wrapper">
      <div className="pv-tree-top-bar">
        <div className="pv-tree-legend">
          <span className="pv-tree-legend-dot" />
          <span className="pv-tree-legend-text">Hierarchical System Architecture</span>
        </div>
        <div className="pv-tree-controls">
          <button
            className="pv-tree-control-btn"
            onClick={() => setAllExpandedKey(k => k + 1)}
            title="Reset to fully expanded view"
          >
            Reset Tree View
          </button>
        </div>
      </div>

      <div className="pv-tree-container" key={allExpandedKey}>
        {/* Root System Node */}
        <div className="pv-tree-root-card">
          <div className="pv-tree-root-header">
            <div className="pv-tree-root-title-group">
              <span className="pv-tree-root-icon">⬡</span>
              <span className="pv-tree-root-title">{tree.name}</span>
            </div>
            {tree.badge && <span className="pv-tree-badge root-badge">{tree.badge}</span>}
          </div>
          {tree.description && (
            <p className="pv-tree-root-desc">{tree.description}</p>
          )}
        </div>

        {/* Tree Branches */}
        {tree.children && tree.children.length > 0 && (
          <div className="pv-tree-root-branches">
            {tree.children.map((childLayer, index) => (
              <TreeNodeItem
                key={childLayer.name + index}
                node={childLayer}
                depth={1}
                isLast={index === tree.children!.length - 1}
              />
            ))}
          </div>
        )}
      </div>

      {description && (
        <div className="pv-tree-summary-note">
          <span className="pv-tree-note-tag">Architecture Note</span>
          <p className="pv-tree-note-text">{description}</p>
        </div>
      )}
    </div>
  );
};

export default ArchitectureTree;
